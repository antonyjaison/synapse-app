import { View, Text, TouchableNativeFeedback, FlatList } from "react-native";
import React, { useEffect, useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { cn } from "@/lib/utils";

type DropdownProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  data: string[];
};

const Dropdown = ({ value, setValue, data }: DropdownProps) => {
  const [open, setOpen] = React.useState(false);
  const [buttonHeight, setButtonHeight] = React.useState(0);

  const buttonRef = useRef<View>(null);

  useEffect(() => {
    buttonRef.current?.measure((x, y, width, height) => {
      setButtonHeight(height);
    });
  }, [buttonRef.current]);

  return (
    <View
      className={cn(
        "rounded-[20px] relative",
        open && "rounded-[11px] rounded-b-none z-[1001]"
      )}
    >
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("", true)}
        onPress={() => setOpen((prev) => !prev)}
      >
        <View
          ref={buttonRef}
          className={cn(
            "flex-row items-center justify-center border bg-cardbg border-cardborder py-1.5 px-2.5 rounded-[20px]",
            open && "rounded-[11px] rounded-b-none"
          )}
          style={{
            gap: 8,
            width: 100,
          }}
        >
          <Text className="text-black">{value}</Text>
          <FontAwesome name="caret-down" size={16} color="black" />
        </View>
      </TouchableNativeFeedback>
      {open && (
        <View
          className="absolute bg-cardbg w-full rounded-b-[11px] border border-t-0 border-cardborder"
          style={{ top: buttonHeight }}
        >
          <FlatList
            data={data}
            renderItem={(item) => (
              <TouchableNativeFeedback
                onPress={() => {
                  setValue(item.item);
                  setOpen(false);
                }}
              >
                <View className="py-1.5">
                  <Text className="text-center">{item.item}</Text>
                </View>
              </TouchableNativeFeedback>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default Dropdown;
