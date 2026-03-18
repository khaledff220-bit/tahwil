export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  color?: 'green' | 'blue' | 'gray';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface CardProps {
  title: string;
  children: React.ReactNode;
  color?: 'green' | 'blue' | 'yellow' | 'purple' | 'red' | 'gray';
  className?: string;
}

export interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  color?: 'green' | 'blue' | 'gray';
  min?: number;
  max?: number;
  className?: string;
}

export interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: (string | { value: string; label: string })[];
  color?: 'green' | 'blue' | 'gray';
  className?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export interface SEOContentProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export interface ConverterProps {
  onResult?: (result: string) => void;
  className?: string;
}
