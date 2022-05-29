import { ProjectItem } from 'api/ProjectApi';

interface ProjectListProps {
  className?: string;
  isLoading?: boolean;
  isSelected: boolean;
  projectItems: ProjectItem[];
  onChange: (id: number) => void;
}

export const ProjectList = ({ className, isLoading = false, isSelected, projectItems, onChange }: ProjectListProps) => (
  <ul className={`w-full h-56 border-2 rounded-lg overflow-y-scroll p-1 ${className}`}>
    {isLoading ? (
      <div>Loading</div>
    ) : (
      <>
        {projectItems.map(projectItem => (
          <li className="my-2" key={projectItem.id}>
            <input
              className="cursor-pointer"
              type="checkbox"
              checked={isSelected}
              id={`${projectItem.id}`}
              name={`${projectItem.id}`}
              value={projectItem.id}
              onChange={e => onChange(Number(e.target.value))}
            />
            <label className="ml-1 cursor-pointer" htmlFor={`${projectItem.id}`}>
              {projectItem.name}
            </label>
          </li>
        ))}
      </>
    )}
  </ul>
);
