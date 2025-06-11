import React from 'react';
import { Search } from 'lucide-react';
import Input from './Input';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "සොයන්න...",
  className = ''
}) => {
  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      icon={Search}
      className={className}
    />
  );
};

export default SearchInput;