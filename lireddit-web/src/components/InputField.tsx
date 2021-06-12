import * as React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useField } from "formik";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  placeholder?: string;
};

const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, { error }] = useField(props);

  /** isInvalid={!!error}
   *  isInvalid는 boolean타입이고 error는 string,
   *  error가 ""이면 false, message가 존재하면 true이기 때문에 !! 붙여줘서 계산
   */

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      <Input {...field} id={field.name} placeholder={props.placeholder} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
