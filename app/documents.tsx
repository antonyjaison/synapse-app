import {
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback,
  TextInput,
  Image,
  FlatList,
  ActivityIndicator,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import DocumentCard from "@/components/DocumentCard";
import HazardButton from "@/components/HazardButton";
import dayjs from "dayjs";
import {
  AntDesign,
  FontAwesome,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";
import Model from "@/components/Model";
import * as DocumentPicker from "expo-document-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { FIRESTORE_DB, STORAGE } from "@/lib/firebase";
import { useUser } from "@/stores/useUser";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getDoc,
  writeBatch,
} from "firebase/firestore";
import { useDocuments } from "@/stores/useDocuments";
import { Document, Prescription } from "@/types/document";
import { z } from "zod";
import { prescriptionSchema } from "@/lib/validation";

const Documents = () => {
  const { user } = useUser();
  const {
    documentLoaded,
    setDocuments,
    documents,
    setDocumentLoaded,
    addDocument,
  } = useDocuments();
  const [showModel, setShowModel] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [filename, setFilename] = useState("");
  const [fileType, setFileType] = useState("");
  const [loading, setLoading] = useState(false);
  const [editPrescription, setEditPrescription] = useState<Prescription>({
    name: "",
    frequency: 0,
    duration: 0,
  });
  const [prescriptions, setPrescriptions] = useState<
    z.infer<typeof prescriptionSchema>
  >([]);
  const [modelState, setModelState] = useState<
    | "home"
    | "documents"
    | "precription"
    | "precription-loading"
    | "prescription-edit"
  >("home");
  const [progress, setProgress] = useState(0);
  const [uploadState, setUploadState] = useState<
    "idle" | "uploading" | "submitting"
  >("idle");

  async function getDocuments() {
    const collectionRef = collection(
      FIRESTORE_DB,
      "storage",
      user?.uid ?? "antony",
      "documents"
    );
    const snapshot = await getDocs(collectionRef);
    const data: Document[] = snapshot.docs.map((doc) => {
      const docData = doc.data();
      return {
        name: docData.name,
        url: docData.url,
      };
    });

    setDocuments(data);
    setDocumentLoaded(true);
  }

  useEffect(() => {
    getDocuments();
  }, []);

  const handleUpload = async (type: "documents" | "precriptions") => {
    // firebase resumable upload

    const res = await fetch(selectedDocument);
    const blob = await res.blob();

    const metadata = {
      contentType: fileType,
      name: filename,
    };

    const fileRef = `${filename}_${new Date().getTime()}`;

    const docRef = ref(STORAGE, `${user?.uid ?? "antony"}/${type}/${fileRef}`);

    const uploadTask = uploadBytesResumable(docRef, blob, metadata);
    setUploadState("uploading");
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error(error);
        closeModel();
      },
      () => {
        setUploadState("submitting");
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          if (type === "documents") {
            const documentRef = collection(
              FIRESTORE_DB,
              "storage",
              user?.uid ?? "antony",
              type
            );
            const res = await addDoc(documentRef, {
              name: filename,
              url: downloadURL,
            });

            const resRef = doc(FIRESTORE_DB, res.path);

            const data = await getDoc(resRef);
            addDocument(data.data() as Document);
            closeModel();
          } else {
            try {
              const res = await fetch(
                "https://c961-2409-40f3-101f-3967-c7e7-ea31-e7c1-5b02.ngrok-free.app/get-prescription",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    image: downloadURL,
                    type: fileType,
                  }),
                }
              );

              const jsonData = await res.json();

              const data = JSON.parse(jsonData);

              const parsedData = prescriptionSchema.safeParse(data);

              if (!parsedData.success) {
                console.log(
                  "error parsing prescription",
                  parsedData.error.formErrors
                );
              } else setPrescriptions(parsedData.data);
            } catch (err) {
              console.error(err);
            }
            setModelState("prescription-edit");
          }
        });
      }
    );
  };

  const selectDocument = async () => {
    let res = null;

    try {
      res = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"],
        copyToCacheDirectory: true,
        multiple: false,
      });
      if (res.canceled) {
        return;
      }

      setFilename(res.assets[0].name);
      setFileType(res.assets[0].mimeType ?? "");

      setSelectedDocument(res.assets[0].uri);
      setModelState("documents");
    } catch (err) {
      console.log("error -----", err);
    }
  };

  const handlePrecription = async () => {
    let res = null;

    try {
      res = await DocumentPicker.getDocumentAsync({
        type: ["image/*"],
        copyToCacheDirectory: true,
        multiple: false,
      });
      if (res.canceled) {
        return;
      }

      setFilename(res.assets[0].name);
      setFileType(res.assets[0].mimeType ?? "");

      setSelectedDocument(res.assets[0].uri);
      setModelState("precription-loading");
    } catch (err) {
      console.log("error -----", err);
    }
  };

  async function uploadPrescription() {
    setLoading(true);
    try {
      const collectionRef = collection(
        FIRESTORE_DB,
        "data",
        user?.uid ?? "antony",
        "prescriptions"
      );
      if (prescriptions.length === 0) {
        return;
      }
      const batch = writeBatch(FIRESTORE_DB);
      prescriptions.forEach((prescription) => {
        const docRef = doc(collectionRef);
        const today = dayjs();
        const expires = today.add(prescription.duration, "day");
        batch.set(docRef, {
          ...prescription,
          expires: expires.toDate(),
        });
      });
      await batch.commit();
    } catch (error) {
      console.error(error);
    }
    closeModel();
    setLoading(false);
  }

  function closeModel() {
    setShowModel(false);
    setUploadState("idle");
    setSelectedDocument(null);
    setModelState("home");
  }

  function addPrescription() {
    const schema = z.object({
      name: z.string().min(3),
      frequency: z.number().min(1),
      duration: z.number().min(1),
    });
    const data = schema.safeParse(editPrescription);
    if (data.success) {
      setPrescriptions([...prescriptions, editPrescription]);
      setEditPrescription({
        name: "",
        frequency: 0,
        duration: 0,
      });
    } else {
      alert("Invalid data");
    }
  }

  return (
    <View className="bg-white flex-1">
      <View>
        <View className="py-4 px-4 pb-28 bg-white border-t border-[#999797] flex-col gap-8">
          <View>
            <Text className="text-lg">Documents</Text>
            <View>
              {documentLoaded &&
                (documents.length > 0 ? (
                  <FlatList
                    data={documents}
                    renderItem={(item) => (
                      <DocumentCard
                        title={item.item.name}
                        subtitle="Health Report"
                        onPress={() => Linking.openURL(item.item.url)}
                      />
                    )}
                  />
                ) : (
                  <Text className="mt-6 italic text-center">
                    No documents found
                  </Text>
                ))}
              {!documentLoaded && (
                <ActivityIndicator className="mt-6" size="large" />
              )}
            </View>
          </View>

          {/* <View>
            <Text className="text-lg">Prescriptions</Text>
            <View>
              <DocumentCard />
              <DocumentCard />
              <DocumentCard />
              <DocumentCard />
            </View>
          </View> */}
        </View>
      </View>
      <HazardButton
        onPress={() => setShowModel(true)}
        color="#006D77"
        icon={<AntDesign name="plus" size={30} color="#fff" />}
      />

      <Model title="Add files" isVisible={showModel} onClose={closeModel}>
        <View>
          {modelState === "documents" && (
            <View className="p-3 flex-col gap-5 w-full py-6">
              <AntDesign name="pdffile1" size={50} color="#C10000" />
              <View
                style={{ borderWidth: 0.5 }}
                className="border-[#707070] rounded-lg w-full px-2 py-2 relative"
              >
                <TextInput
                  value={filename}
                  autoCapitalize="none"
                  onChangeText={(text) => setFilename(text)}
                  placeholder="Health report"
                  className=" ml-2"
                />
                <Text className="absolute top-[-7px] left-2 bg-white px-2 text-xs text-[#707070]">
                  Document Name
                </Text>
              </View>
              <View className=" w-full overflow-hidden rounded-lg">
                <TouchableNativeFeedback
                  disabled={uploadState !== "idle"}
                  onPress={() => handleUpload("documents")}
                >
                  <View className=" w-full bg-[#006D77] py-2">
                    <Text className=" text-white text-lg text-center">
                      {uploadState === "idle" && "Submit"}
                      {uploadState === "uploading" &&
                        `Uploading ${progress.toFixed(2)}%`}
                      {uploadState === "submitting" && "Submitting"}
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          )}
          {modelState === "home" && (
            <View>
              <TouchableNativeFeedback onPress={selectDocument}>
                <View className=" p-3 flex-row h-fit items-center justify-between">
                  <Text className="font-medium text-lg">Document</Text>
                  <Ionicons name="chevron-forward" size={20} />
                </View>
              </TouchableNativeFeedback>
              <View className=" w-full h-[1px] bg-[#d8d8d8]" />
              <TouchableNativeFeedback
                onPress={() => setModelState("precription")}
              >
                <View className=" p-3 flex-row h-fit items-center justify-between">
                  <Text className="font-medium text-lg">Prescription</Text>
                  <Ionicons name="chevron-forward" size={20} />
                </View>
              </TouchableNativeFeedback>
            </View>
          )}
          {modelState === "precription" && (
            <View className="items-center py-5">
              <Text className="font-medium text-lg mb-10">Choose Input</Text>
              <View className="flex-row" style={{ gap: 35 }}>
                <TouchableNativeFeedback
                  onPress={() => setModelState("prescription-edit")}
                >
                  <View
                    className="p-8 py-5 pt-6 h-fit items-center bg-[#ECECEC] rounded-2xl"
                    style={{ gap: 10 }}
                  >
                    <FontAwesome6 name="i-cursor" size={50} />
                    <Text>Type</Text>
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={handlePrecription}>
                  <View
                    className="p-8 py-5 pt-6 h-fit items-center bg-[#ECECEC] rounded-2xl"
                    style={{ gap: 10 }}
                  >
                    <FontAwesome6 name="expand" size={50} />
                    <Text>Scan</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          )}
          {modelState === "precription-loading" && (
            <View className="p-3 flex-col w-full py-6" style={{ gap: 10 }}>
              <Image
                source={{ uri: selectedDocument }}
                style={{ width: "100%", height: 200 }}
              />
              <TouchableNativeFeedback
                disabled={uploadState !== "idle"}
                onPress={() => handleUpload("precriptions")}
              >
                <View className="bg-[#006D77] w-full py-3 rounded-md">
                  <Text className="text-white text-center font-bold tracking-wide text-lg">
                    {uploadState === "idle" && "Scan"}
                    {uploadState === "uploading" &&
                      `Uploading ${progress.toFixed(2)}%`}
                    {uploadState === "submitting" && "Scanning"}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          )}

          {modelState === "prescription-edit" && (
            <View>
              <ScrollView className="h-72 px-4">
                <View className="py-2.5 flex-row" style={{ gap: 5 }}>
                  <View
                    style={{ borderWidth: 0.5 }}
                    className="border-[#707070] rounded-lg w-[48%] px-2 py-2 relative"
                  >
                    <TextInput
                      value={editPrescription.name}
                      autoCapitalize="none"
                      onChangeText={(text) =>
                        setEditPrescription({ ...editPrescription, name: text })
                      }
                      placeholder="medicine"
                      className=" ml-2"
                    />
                  </View>
                  <View
                    style={{ borderWidth: 0.5 }}
                    className="border-[#707070] rounded-lg w-[24%] px-2 py-2 relative"
                  >
                    <TextInput
                      value={editPrescription.frequency.toString()}
                      keyboardType="number-pad"
                      autoCapitalize="none"
                      onChangeText={(text) =>
                        setEditPrescription({
                          ...editPrescription,
                          frequency: Number(text),
                        })
                      }
                      placeholder="freq"
                      className=" ml-2"
                    />
                  </View>
                  <View
                    style={{ borderWidth: 0.5 }}
                    className="border-[#707070] rounded-lg w-[24%] px-2 py-2 relative"
                  >
                    <TextInput
                      value={editPrescription.duration.toString()}
                      keyboardType="number-pad"
                      autoCapitalize="none"
                      onChangeText={(text) =>
                        setEditPrescription({
                          ...editPrescription,
                          duration: Number(text),
                        })
                      }
                      placeholder="dur"
                      className=" ml-2"
                    />
                  </View>
                </View>
                <View className="">
                  <TouchableNativeFeedback onPress={addPrescription}>
                    <View className="bg-[#006D77] w-full py-3 rounded-md">
                      <Text className="text-white text-center font-bold tracking-wide text-lg">
                        Add
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                </View>
                {prescriptions.map((prescription, index) => (
                  <DocumentCard
                    key={index}
                    title={prescription.name}
                    subtitle={`Frequency: ${prescription.frequency} Duration: ${prescription.duration}`}
                    onPress={() => {
                      setEditPrescription(prescription);
                      setPrescriptions(
                        prescriptions.filter((_, i) => i !== index)
                      );
                    }}
                  />
                ))}
              </ScrollView>
              <View>
                <TouchableNativeFeedback
                  disabled={loading}
                  onPress={() => uploadPrescription()}
                >
                  <View className="bg-[#006D77] w-full py-3">
                    <Text className="text-white text-center font-bold tracking-wide text-lg">
                      Submit
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          )}
        </View>
      </Model>
    </View>
  );
};

export default Documents;
