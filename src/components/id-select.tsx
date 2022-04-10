// TODO:封装 IdSelect 组件，解决select元素会将value值隐式转换为string类型的问题
import React from "react";
import { Raw } from "../types";
import { Select } from "antd";
import { valueType } from "antd/lib/statistic/utils";

type SelectProps = React.ComponentType<typeof Select>;

interface IdSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value: Raw | undefined | null;
  // select会将value的类型转换为string，手动转换为number，使得数据保持一致
  onChange: (value?: number) => void;
  // 默认选项名
  defaultOptionName?: string;
  // 其余选项的value和name
  options?: { name: string; id: number }[];
}

/**
 * value 可以传入多种类型的值
 * onChange 只会回调 number | undefined 类型
 * 当 isNaN(Number(value)) 为 true，代表选择默认类型
 * 当选择默认类型时，onChange 会回调 undefined
 * @param props
 * @returns
 */
export default function IdSelect(props: IdSelectProps) {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;

  return (
    <Select
      value={toNumber(value)}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
}

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
