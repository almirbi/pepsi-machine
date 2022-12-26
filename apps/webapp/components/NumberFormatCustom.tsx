import * as React from "react";
import {
  NumericFormat,
  NumericFormatProps,
  InputAttributes,
} from "react-number-format";

interface CustomProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const NumberFormatCustom = React.forwardRef<
  NumericFormatProps<InputAttributes>,
  CustomProps
>(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      prefix="R "
      allowNegative={false}
      decimalScale={2}
      min={0.05}
    />
  );
});
