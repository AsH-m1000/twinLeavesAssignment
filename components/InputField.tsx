import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TextInputProps,
} from 'react-native';

interface InputFieldProps {
  label: string;
  icon: React.ReactNode;
  inputType?: 'password';
  keyboardType?: TextInputProps['keyboardType'];
  fieldButtonLabel?: string;
  fieldButtonFunction?: () => void;
  textChange: (text: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  textChange,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}>
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0, color: 'orange'}}
          secureTextEntry={true}
          onChangeText={text => {
            textChange(text);
          }}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0, color: 'orange'}}
          onChangeText={text => {
            textChange(text);
          }}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{color: '#AD40AF', fontWeight: '700'}}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default InputField;
