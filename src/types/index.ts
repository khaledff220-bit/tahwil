// ============ أنواع التقويم ============
export type HijriMonth = string
export type GregorianMonth = string

// ============ خصائص المحولات ============
export interface ConverterProps {
  onConvert?: (result: string) => void
  className?: string
}

export interface SelectOption {
  value: string
  label: string
}

// ============ خصائص SEO ============
export interface SEOContentProps {
  title: string
  description: string
  children?: React.ReactNode
}

export interface FAQItem {
  question: string
  answer: string
}

export interface FAQProps {
  items: FAQItem[]
  title?: string
}

// ============ خصائص المكونات المشتركة ============
export interface CardProps {
  children: React.ReactNode
  title?: string
  color?: 'green' | 'blue' | 'yellow' | 'purple' | 'red' | 'gray'
  className?: string
}

export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  color?: 'green' | 'blue' | 'gray'
  fullWidth?: boolean
  disabled?: boolean
  className?: string
}

export interface InputProps {
  label: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'number'
  placeholder?: string
  color?: 'green' | 'blue' | 'gray'
  min?: number
  max?: number
  className?: string
}

export interface SelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[] | SelectOption[]
  color?: 'green' | 'blue' | 'gray'
  className?: string
}
