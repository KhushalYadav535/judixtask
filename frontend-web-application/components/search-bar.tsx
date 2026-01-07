"use client"

interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="hidden md:flex items-center bg-background rounded-lg border border-border px-4 py-2">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
        className="bg-transparent outline-none text-foreground placeholder-secondary text-sm w-48"
      />
      <span className="text-secondary text-sm">🔍</span>
    </div>
  )
}
