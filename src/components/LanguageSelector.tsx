
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Language } from "@/types";

const languages: { value: Language; label: string }[] = [
  { value: "uz_latin", label: "O'zbekcha" },
  { value: "uz_cyrillic", label: "Ўзбекча" },
  { value: "ru", label: "Русский" },
  { value: "en", label: "English" },
];

export function LanguageSelector() {
  const { language, setLanguage } = useApp();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {languages.find((l) => l.value === language)?.label}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.value}
            onClick={() => setLanguage(lang.value)}
            className="flex items-center justify-between"
          >
            {lang.label}
            {language === lang.value && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
