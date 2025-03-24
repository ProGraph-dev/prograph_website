// First, update the interface to include onSubmit
interface IProjectsInlineFilterProps {
  onSearch: (value: string) => void;
  viewToggled: (value: boolean) => void;
  filtersForm?: React.ReactNode;
  onSubmit?: (values: Record<string, any>) => void;  // Add this line
}