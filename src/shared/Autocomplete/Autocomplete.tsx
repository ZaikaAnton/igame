import {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  ReactNode,
  ElementType,
  ComponentPropsWithoutRef,
  CSSProperties,
  Fragment,
} from "react";
import Box from "@/shared/Box/Box";
import Typography from "@/shared/Typography/Typography";
import TextField from "@/shared/TextField/TextField";
import "./Autocomplete.css";

interface Option {
  label: string;
  value: string | number;
}

type AutocompleteProps<T extends ElementType = "div"> = {
  as?: T;
  options: Option[];
  value?: Option | null;
  onValueChange?: (value: Option | null) => void;
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
  noOptionsText?: string;
  renderOption?: (option: Option, isSelected: boolean) => ReactNode;
} & Omit<
  ComponentPropsWithoutRef<T>,
  "as" | "children" | "className" | "style" | "onChange"
>;

const Autocomplete = <T extends ElementType = "div">({
  as,
  options,
  value,
  onValueChange,
  placeholder = "Select",
  className,
  style,
  noOptionsText = "No options",
  renderOption,
  ...rest
}: AutocompleteProps<T>) => {
  const Component = as || "div";
  const [inputValue, setInputValue] = useState(value?.label ?? "");
  const [isOpen, setIsOpen] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = hasTyped
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(inputValue.toLowerCase())
      )
    : options;

  useEffect(() => {
    if (value?.label !== inputValue) {
      setInputValue(value?.label ?? "");
    }
  }, [value]);

  const openList = () => {
    setIsOpen(true);
    setHasTyped(false);
  };
  const closeList = () => {
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleInputChange = (val: string) => {
    setInputValue(val);
    setHasTyped(true);
    setIsOpen(true);

    if (onValueChange) onValueChange(null);
  };

  const handleOptionSelect = (option: Option) => {
    setInputValue(option.label);
    setIsOpen(false);

    if (onValueChange) onValueChange(option);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        closeList();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Component
      className={["autocomplete-container", className]
        .filter(Boolean)
        .join(" ")}
      style={style}
      ref={containerRef}
      {...rest}
    >
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextField
          ref={inputRef}
          inputClassName="autocomplete-input"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={openList}
          autoComplete="off"
          wrapperComponent={Fragment}
        />

        <img
          src={"/assets/arrowDown.svg"}
          alt="Toggle"
          onClick={() => {
            setIsOpen((prev) => !prev);
            setHasTyped(false);
            inputRef.current?.blur();
          }}
          style={{ cursor: "pointer" }}
        />
      </Box>

      {isOpen && (
        <Box as="ul" className="autocomplete-list" role="listbox">
          {filteredOptions.length === 0 ? (
            <Typography
              as="li"
              className="autocomplete-no-options"
              variantClass="text-14-600"
            >
              {noOptionsText}
            </Typography>
          ) : (
            filteredOptions.map((option) => {
              const isSelected = value?.value === option.value;

              return (
                <Typography
                  as="li"
                  key={option.value}
                  className={[
                    "autocomplete-option",
                    isSelected ? "selected" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleOptionSelect(option);
                  }}
                  role="option"
                  aria-selected={isSelected}
                  variantClass="text-14-600"
                >
                  {renderOption
                    ? renderOption(option, isSelected)
                    : option.label}
                </Typography>
              );
            })
          )}
        </Box>
      )}
    </Component>
  );
};

export default Autocomplete;
