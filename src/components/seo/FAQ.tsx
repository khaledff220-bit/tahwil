import React from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

const FAQ: React.FC<FAQProps> = ({ items, title = 'أسئلة شائعة' }) => {
  return (
    <div className="mt-8">
      {title && <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>}
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <p className="font-semibold text-gray-800 mb-2">س: {item.question}</p>
            <p className="text-gray-600">ج: {item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
