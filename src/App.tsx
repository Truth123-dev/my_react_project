import { useState } from "react";

// Define the supported locales and their display labels
interface LocaleOption {
  code: string;
  name: string;
  example: string;
}

const locales: LocaleOption[] = [
  { code: "en-US", name: "United States", example: "1,234,567.89" },
  { code: "de-DE", name: "Germany / Europe", example: "1.234.567,89" },
  { code: "fr-FR", name: "France", example: "1 234 567,89" },
  { code: "en-IN", name: "India", example: "12,34,567.89" },
];

export default function Calculator() {
  // State variables for calculation logic
  const [currentValue, setCurrentValue] = useState<string>("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState<boolean>(false);
  const [memory, setMemory] = useState<number>(0);
  const [formula, setFormula] = useState<string>("");
  const [selectedLocale, setSelectedLocale] = useState<string>("en-US");

  // Helper function to format strings to localized numbers dynamically
  const formatValue = (valStr: string, localeCode: string): string => {
    if (!valStr) return "0";
    if (valStr === "Error") return "Error";
    if (valStr === "-") return "-";

    // Split value into integer and decimal portions to preserve decimal typing status
    const parts = valStr.split(".");
    const integerPart = parseFloat(parts[0]);

    if (isNaN(integerPart)) return parts[0];

    const formattedInteger = new Intl.NumberFormat(localeCode, {
      maximumFractionDigits: 0,
    }).format(integerPart);

    if (parts.length > 1) {
      // Find the specific decimal separator used by the active locale
      const decimalSeparator =
        new Intl.NumberFormat(localeCode)
          .formatToParts(1.1)
          .find((part) => part.type === "decimal")?.value || ".";
      return `${formattedInteger}${decimalSeparator}${parts[1]}`;
    }

    return formattedInteger;
  };

  // Append digit to current value
  const inputDigit = (digit: string) => {
    if (currentValue === "0" || overwrite) {
      setCurrentValue(digit);
      setOverwrite(false);
    } else {
      setCurrentValue(currentValue + digit);
    }
  };

  // Handle decimal insertion
  const inputDecimal = () => {
    if (overwrite) {
      setCurrentValue("0.");
      setOverwrite(false);
      return;
    }
    if (!currentValue.includes(".")) {
      setCurrentValue(currentValue + ".");
    }
  };

  // Perform basic and scientific calculations
  const executeCalculation = (
    op: string,
    val1: number,
    val2: number,
  ): number => {
    switch (op) {
      case "+":
        return val1 + val2;
      case "-":
        return val1 - val2;
      case "*":
        return val1 * val2;
      case "/":
        return val2 !== 0 ? val1 / val2 : NaN;
      default:
        return val2;
    }
  };

  // Handle operation selection
  const selectOperator = (nextOp: string) => {
    const inputValue = parseFloat(currentValue);

    if (previousValue === null) {
      setPreviousValue(currentValue);
      setOperation(nextOp);
      setFormula(`${formatValue(currentValue, selectedLocale)} ${nextOp}`);
      setOverwrite(true);
    } else if (operation) {
      const prev = parseFloat(previousValue);
      const calculated = executeCalculation(operation, prev, inputValue);

      if (isNaN(calculated)) {
        setCurrentValue("Error");
        setPreviousValue(null);
        setOperation(null);
        setFormula("");
      } else {
        // Fix floating point precision errors
        const roundedResult = parseFloat(calculated.toFixed(10)).toString();
        setPreviousValue(roundedResult);
        setCurrentValue(roundedResult);
        setFormula(`${formatValue(roundedResult, selectedLocale)} ${nextOp}`);
      }
      setOperation(nextOp);
      setOverwrite(true);
    }
  };

  // Resolve calculations
  const equals = () => {
    if (!operation || previousValue === null) return;

    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    const calculated = executeCalculation(operation, prev, current);

    if (isNaN(calculated)) {
      setCurrentValue("Error");
    } else {
      const roundedResult = parseFloat(calculated.toFixed(10)).toString();
      setCurrentValue(roundedResult);
      setFormula("");
    }
    setPreviousValue(null);
    setOperation(null);
    setOverwrite(true);
  };

  // Perform single-argument operations (Square Root, Sign Toggle, Percentage)
  const singleAction = (action: string) => {
    const val = parseFloat(currentValue);
    if (isNaN(val)) return;

    switch (action) {
      case "sqrt":
        if (val < 0) {
          setCurrentValue("Error");
        } else {
          setCurrentValue(parseFloat(Math.sqrt(val).toFixed(10)).toString());
        }
        break;
      case "toggle":
        setCurrentValue((val * -1).toString());
        break;
      case "percent":
        setCurrentValue((val / 100).toString());
        break;
      default:
        break;
    }
  };

  // Handle Backspace
  const backspace = () => {
    if (overwrite || currentValue === "Error") {
      setCurrentValue("0");
    } else if (currentValue.length > 1) {
      setCurrentValue(currentValue.slice(0, -1));
    } else {
      setCurrentValue("0");
    }
  };

  // Clear states
  const clearAll = () => {
    setCurrentValue("0");
    setPreviousValue(null);
    setOperation(null);
    setFormula("");
    setOverwrite(false);
  };

  // Memory Registers (MC, MR, M+, M-)
  const handleMemory = (action: string) => {
    const currentNum = parseFloat(currentValue);
    if (isNaN(currentNum)) return;

    switch (action) {
      case "MC":
        setMemory(0);
        break;
      case "MR":
        setCurrentValue(memory.toString());
        setOverwrite(true);
        break;
      case "M+":
        setMemory(memory + currentNum);
        setOverwrite(true);
        break;
      case "M-":
        setMemory(memory - currentNum);
        setOverwrite(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-slate-500 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 text-white rounded-3xl shadow-2xl overflow-hidden border border-slate-800">
        {/* Top bar with Localization Select Panel */}
        <div className="p-4 bg-slate-800 border-b border-slate-700 flex flex-col gap-2">
          <label className="text-xs text-slate-400 font-semibold tracking-wider uppercase">
            International Format Locale
          </label>
          <select
            value={selectedLocale}
            onChange={(e) => setSelectedLocale(e.target.value)}
            className="w-full bg-slate-950 text-white border border-slate-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            {locales.map((loc) => (
              <option key={loc.code} value={loc.code}>
                {loc.name} ({loc.example})
              </option>
            ))}
          </select>
        </div>

        {/* Display Screen */}
        <div className="p-6 text-right flex flex-col justify-end min-h-35 bg-slate-950">
          <div className="text-sm text-slate-400 font-mono h-6 overflow-hidden">
            {formula}
          </div>
          <div className="text-4xl font-light tracking-tight font-sans truncate mt-2">
            {formatValue(currentValue, selectedLocale)}
          </div>
          <div className="flex justify-between items-center mt-3 text-xs text-slate-500">
            <div>
              {memory !== 0 && (
                <span className="bg-slate-800 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">
                  M: {formatValue(memory.toString(), selectedLocale)}
                </span>
              )}
            </div>
            <span className="font-mono text-[10px] tracking-widest uppercase">
              Standard Professional
            </span>
          </div>
        </div>

        {/* Keypad */}
        <div className="p-4 grid grid-cols-4 gap-2 bg-slate-900">
          {/* Row 1: Memory & System Functions */}
          <button
            onClick={() => handleMemory("MC")}
            className="bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-300 font-mono py-3 rounded-xl transition duration-150 text-sm"
          >
            MC
          </button>
          <button
            onClick={() => handleMemory("MR")}
            className="bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-300 font-mono py-3 rounded-xl transition duration-150 text-sm"
          >
            MR
          </button>
          <button
            onClick={() => handleMemory("M+")}
            className="bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-300 font-mono py-3 rounded-xl transition duration-150 text-sm"
          >
            M+
          </button>
          <button
            onClick={() => handleMemory("M-")}
            className="bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-300 font-mono py-3 rounded-xl transition duration-150 text-sm"
          >
            M-
          </button>

          {/* Row 2: Mathematical Modifiers & Cleaners */}
          <button
            onClick={clearAll}
            className="bg-red-500/20 hover:bg-red-500/30 active:bg-red-500/40 text-red-400 font-semibold py-3 rounded-xl transition duration-150"
          >
            C
          </button>
          <button
            onClick={backspace}
            className="bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-300 font-bold py-3 rounded-xl transition duration-150 flex items-center justify-center"
          >
            ⌫
          </button>
          <button
            onClick={() => singleAction("percent")}
            className="bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-300 font-semibold py-3 rounded-xl transition duration-150"
          >
            %
          </button>
          <button
            onClick={() => selectOperator("/")}
            className="bg-emerald-500/20 hover:bg-emerald-500/30 active:bg-emerald-500/40 text-emerald-400 font-bold py-3 rounded-xl transition duration-150"
          >
            ÷
          </button>

          {/* Row 3: 7 8 9 & Multiply */}
          <button
            onClick={() => inputDigit("7")}
            className="bg-slate-800 hover:bg-slate-750 active:bg-slate-700 text-slate-100 font-medium py-4 rounded-xl transition duration-150 text-lg"
          >
            7
          </button>
          <button
            onClick={() => inputDigit("8")}
            className="bg-slate-800 hover:bg-slate-750 active:bg-slate-700 text-slate-100 font-medium py-4 rounded-xl transition duration-150 text-lg"
          >
            8
          </button>
          <button
            onClick={() => inputDigit("9")}
            className="bg-slate-800 hover:bg-slate-750 active:bg-slate-700 text-slate-100 font-medium py-4 rounded-xl transition duration-150 text-lg"
          >
            9
          </button>
          <button
            onClick={() => selectOperator("*")}
            className="bg-emerald-500/20 hover:bg-emerald-500/30 active:bg-emerald-500/40 text-emerald-400 font-bold py-3 rounded-xl transition duration-150"
          >
            ×
          </button>

          {/* Row 4: 4 5 6 & Minus */}
          <button
            onClick={() => inputDigit("4")}
            className="bg-slate-800 hover:bg-slate-750 active:bg-slate-700 text-slate-100 font-medium py-4 rounded-xl transition duration-150 text-lg"
          >
            4
          </button>
          <button
            onClick={() => inputDigit("5")}
            className="bg-slate-800 hover:bg-slate-750 active:bg-slate-700 text-slate-100 font-medium py-4 rounded-xl transition duration-150 text-lg"
          >
            5
          </button>
          <button
            onClick={() => inputDigit("6")}
            className="bg-slate-800 hover:bg-slate-750 active:bg-slate-700 text-slate-100 font-medium py-4 rounded-xl transition duration-150 text-lg"
          >
            6
          </button>
          <button
            onClick={() => selectOperator("-")}
            className="bg-emerald-500/20 hover:bg-emerald-500/30 active:bg-emerald-500/40 text-emerald-400 font-bold py-3 rounded-xl transition duration-150"
          >
            −
          </button>

          {/* Row 5: 1 2 3 & Plus */}
          <button
            onClick={() => inputDigit("1")}
            className="bg-slate-800 hover:bg-slate-750 active:bg-slate-700 text-slate-100 font-medium py-4 rounded-xl transition duration-150 text-lg"
          >
            1
          </button>
          <button
            onClick={() => inputDigit("2")}
            className="bg-slate-800 hover:bg-slate-750 active:bg-slate-700 text-slate-100 font-medium py-4 rounded-xl transition duration-150 text-lg"
          >
            2
          </button>
          <button
            onClick={() => inputDigit("3")}
            className="bg-slate-800 hover:bg-slate-750 active:bg-slate-700 text-slate-100 font-medium py-4 rounded-xl transition duration-150 text-lg"
          >
            3
          </button>
          <button
            onClick={() => selectOperator("+")}
            className="bg-emerald-500/20 hover:bg-emerald-500/30 active:bg-emerald-500/40 text-emerald-400 font-bold py-4 rounded-xl transition duration-150"
          >
            +
          </button>

          {/* Row 6: Sign Change, 0, Decimal Point & Equals */}
          <button
            onClick={() => singleAction("toggle")}
            className="bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-300 font-medium py-3 rounded-xl transition duration-150"
          >
            ±
          </button>
          <button
            onClick={() => inputDigit("0")}
            className="bg-slate-800 hover:bg-slate-750 active:bg-slate-700 text-slate-100 font-medium py-3 rounded-xl transition duration-150 text-lg"
          >
            0
          </button>
          <button
            onClick={inputDecimal}
            className="bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-300 font-bold py-3 rounded-xl transition duration-150 text-lg"
          >
            .
          </button>
          <button
            onClick={equals}
            className="bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold py-3 rounded-xl transition duration-150 shadow-lg shadow-emerald-500/20 text-lg"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}
