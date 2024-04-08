import {
  ImageBackground,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Bubble,
  GiftedChat,
  IMessage,
  Time,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import messageData from "@/assets/data/messages.json";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { useChatStore } from "@/stores/useChat";
import { cn } from "@/lib/utils";

type MyMessageType = {
  id: string;
  from: 0 | 1;
  msg: string;
  date: Date;
};

const ChatTab = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const { setIsChatInputFocus, isChatInputFocus, setIsChatInputBlur, model } =
    useChatStore();

  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1, // Rotate 360 degrees
        duration: 1000, // Animation speed (1000 ms = 1 second)
        useNativeDriver: true, // Use native driver for better performance
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    setMessages([
      ...messageData.map((message: MyMessageType) => {
        return {
          _id: message?.id,
          text: message?.msg,
          createdAt: new Date(message?.date),
          user: {
            _id: message?.from,
            name: message?.from ? "user" : "hygeia",
            avatar: message?.from ? "" : "https://github.com/shadcn.png",
          },
        };
      }),
    ]);
  }, []);

  const handleInputChange = (e: any) => {
    setText(e);
  };

  const onSend = useCallback(
    async (messages = []) => {
      try {
        setLoading(true); // Start loading

        // Append new messages to the chat
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, messages)
        );

        // Perform the POST request
        const response = await fetch(
          `https://c961-2409-40f3-101f-3967-c7e7-ea31-e7c1-5b02.ngrok-free.app/${model}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messages: text, // Assuming 'text' is the text from the new message
              uid: "rcT4Yob91eNQMeSl1INaE7BsRBq1",
            }),
          }
        );

        if (!response.ok) throw new Error("Failed to fetch");

        const res = response;
        console.log(JSON.stringify(res));

        const textResponse = await response.text(); // Use .text() instead of .json()
        console.log(textResponse);

        // Check if the text response is not empty and append message
        if (textResponse) {
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, {
              _id: Math.random().toString(),
              text: textResponse.trim().replaceAll('"', "").replaceAll("\n",""), // Use the text response directly
              createdAt: new Date(),
              user: {
                _id: 2,
                name: "hygeia",
                avatar: "https://github.com/shadcn.png",
              },
            })
          );
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setLoading(false); // Stop loading regardless of outcome
      }
    },
    [model, text] // Ensure 'model' and 'text' are included in dependency array if they are used within the callback
  );

  const renderTime = (props: any) => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          right: {
            color: "#757575",
          },
          left: {
            color: "#ccc",
          },
        }}
      />
    );
  };

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "transparent",
            borderBottomRightRadius: 10,
            borderTopRightRadius: 0,
            borderWidth: 0.5,
            borderColor: "#6C6969",
            marginBottom: 20,
            marginTop: 5,
          },
          left: {
            backgroundColor: model === "hygeia" ? "#006D77" : "#F19483",
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 0,
            marginBottom: 20,
            marginTop: 5,
          },
        }}
        textStyle={{
          right: {
            color: "#000",
          },
          left: {
            color: "#fff",
          },
        }}
        renderTime={renderTime}
      />
    );
  };

  const renderAvatar = (props: any) => {
    const { currentMessage } = props;
    const user = currentMessage.user;

    // Avatar styling
    const avatarStyle = {
      width: 36, // Size of the avatar
      height: 36,
      borderRadius: 18, // Makes the avatar round
      marginRight: 10, // Spacing between avatar and message bubble
      overflow: "hidden", // Ensures the image fits nicely within the rounded borders
      marginBottom: 20,
    };

    const textStyle = {
      color: "#FFFFFF", // Text color for initials
      fontWeight: "bold", // Makes initials more prominent
      fontSize: 14, // Size of the text for initials
    };

    // Function to get initials from user name
    const getInitials = (name: any) => {
      const parts = name.split(" ");
      const initials = parts.map((part: any) => part[0]).join("");
      return initials.toUpperCase();
    };

    if (user.avatar) {
      // If the user has an avatar, display it
      return <Image source={{ uri: user.avatar }} style={avatarStyle} />;
    } else {
      // If no avatar is available, display initials or a default image
      const initials = getInitials(user.name);

      return (
        <View
          style={[
            avatarStyle,
            {
              backgroundColor: "#006D77",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Text style={textStyle}>{initials}</Text>
        </View>
      );
    }
  };

  return (
    <ImageBackground
      source={
        model === "hygeia"
          ? require("@/assets/images/chat-bg.png")
          : require("@/assets/images/sage-bg.png")
      }
      style={{ flex: 1 }}
    >
      <GiftedChat
        bottomOffset={-20}
        messages={messages}
        onSend={(messages: any) => onSend(messages)}
        user={{
          _id: 1,
          name: "user",
        }}
        renderChatEmpty={() => (
          <View className=" h-[500px] justify-around items-center rotate-180">
            <View />
            <View className=" justify-center items-center">
              {model === "hygeia" ? (
                <Image
                  className=" w-24 h-24"
                  source={require("@/assets/images/hygeia.png")}
                />
              ) : (
                <Image
                  className=" w-24 h-24"
                  source={require("@/assets/images/sage.png")}
                />
              )}

              <Text
                className={cn(
                  " text-xl text-center mt-7",
                  model === "sage" && "px-7"
                )}
              >
                {model === "hygeia"
                  ? "Hi there! I'm Hygeia, your friendly health companion."
                  : "Hi there!  I'm Sage, your friendly Mental health care companion."}
              </Text>
            </View>
            <Text className="px-7 text-[#2D2D2D] text-xs font-light">
              Do not send any sensitive or explicit text in this chat. View
              <Text className=" underline">Willow Privacy</Text>
            </Text>
          </View>
        )}
        renderAvatar={renderAvatar}
        renderBubble={renderBubble}
        renderSend={(props) => (
          <Send disabled={loading} {...props} alwaysShowSend>
            <View
              style={{
                height: 46,
                marginLeft: 5,
              }}
            >
              <Ionicons name="send" size={25} color="#006D77" />
            </View>
          </Send>
        )}
        textInputProps={{
          placeholder: "Type or say to begin chat...",
          placeholderTextColor: "#2A2A2A",
          style: {
            backgroundColor: "#dadada",
            color: "#000",
            padding: 10,
            marginVertical: 10,
            borderRadius: 30,
            width: "80%",
            marginLeft: 5,
          },
        }}
        onInputTextChanged={handleInputChange}
        maxComposerHeight={100}
        renderInputToolbar={(props: any) => {
          const textInputProps = {
            ...props.textInputProps,
            onFocus: () => {
              setIsChatInputFocus();
            },
            onBlur: () => {
              setIsChatInputBlur();
            },
          };

          return (
            <InputToolbar
              {...props}
              textInputProps={textInputProps}
              containerStyle={{
                backgroundColor: "white",
              }}
              renderActions={() => (
                <TouchableOpacity
                  style={{ height: 46, marginLeft: 5 }}
                  onPress={() => console.log("Actions button")}
                >
                  <Ionicons name="mic-outline" size={24} color="black" />
                </TouchableOpacity>
              )}
            />
          );
        }}
      />
      {loading && (
        <View
          style={{
            position: "absolute",
            bottom: 80,
            left: 10,
            alignItems: "center",
          }}
        >
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <EvilIcons name="spinner" size={40} />
          </Animated.View>
        </View>
      )}
    </ImageBackground>
  );
};

export default ChatTab;
