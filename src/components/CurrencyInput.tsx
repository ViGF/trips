import _CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";
import { twMerge } from "tailwind-merge";

interface InputProps extends CurrencyInputProps {
  error?: boolean;
  errorMessage?: string;
}

export function CurrencyInput({
  className,
  error,
  errorMessage,
  ...props
}: InputProps) {
  const inputClassName = twMerge(
    className,
    "rounded-lg border border-gray-300 bg-white p-2 text-sm font-normal text-dark outline-none transition-all focus:ring-1 focus:ring-primary",
    error ? "border-red-500" : ""
  );

  return (
    <div className="flex w-full flex-col">
      <_CurrencyInput
        lang="pt-BR"
        className={inputClassName}
        intlConfig={{ locale: "pt-BR", currency: "BRL" }}
        {...props}
      />
      {error && errorMessage && (
        <div className="mt-1 text-xs text-red-500">{errorMessage}</div>
      )}
    </div>
  );
}