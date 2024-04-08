import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import DocumentCard from "./DocumentCard";
import PrescriptionCard from "./PrescriptionCard";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "@/lib/firebase";
import { useUser } from "@/stores/useUser";
import { Prescription } from "@/types/document";
import { usePathname } from "expo-router";

const DocumentsSection = () => {
  const [precriptions, setPrescriptions] = useState<
    {
      name: string;
      expires: Date;
      frequency: number;
    }[]
  >([]);
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  useEffect(() => {
    (async () => {
      setLoading(true);
      const prescriptionCollection = collection(
        FIRESTORE_DB,
        "data",
        user?.uid ?? "antony",
        "prescriptions"
      );
      const res = await getDocs(prescriptionCollection);

      const prescriptionData: {
        name: string;
        expires: Date;
        frequency: number;
      }[] = [];
      res.forEach((doc) => {
        const data = doc.data();

        if (data.expires.toDate() > new Date()) {
          prescriptionData.push({
            name: data.name,
            expires: data.expires.toDate(),
            frequency: data.frequency,
          });
        }
      });
      setPrescriptions(prescriptionData);
      setLoading(false);
    })();
  }, [pathname]);
  return (
    <View className="bg-[#FFFEFE] px-6 py-5 rounded-2xl flex-col">
      <Text className="font-medium text-lg">Your Active Prescriptions</Text>

      <View className=" flex-row flex-wrap justify-around py-2">
        {!loading && precriptions.length !== 0 && (
          <>
            {precriptions.map((prescription, index) => (
              <PrescriptionCard
                key={index}
                title={prescription.name}
                subtitle={`completes on ${prescription.expires.toDateString()}`}
              />
            ))}
          </>
        )}
        {loading && (
          <ActivityIndicator className="mt-5" size={30} color="#000" />
        )}
        {!loading && precriptions.length === 0 && (
          <Text className="italic mt-6">No prescriptions found</Text>
        )}
      </View>
    </View>
  );
};

export default DocumentsSection;
