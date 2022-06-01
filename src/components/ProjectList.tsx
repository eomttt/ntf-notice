import { ProjectItem } from 'api/ProjectApi';
import { CheckBox } from 'components/CheckBox';

interface ProjectListProps {
  className?: string;
  isLoading?: boolean;
  isSelected: boolean;
  projectItems: ProjectItem[];
  onChange: (id: number) => void;
}

export const ProjectList = ({ className, isLoading = false, isSelected, projectItems, onChange }: ProjectListProps) => (
  <ul className={`w-full h-56 border-2 border-black rounded-lg overflow-y-scroll p-1 ${className}`}>
    {isLoading ? (
      <div>Loading</div>
    ) : (
      <>
        {projectItems.map(projectItem => (
          <li className="my-2" key={projectItem.id}>
            <CheckBox
              checked={isSelected}
              id={`${projectItem.id}`}
              name={`${projectItem.id}`}
              value={`${projectItem.id}`}
              label={
                <>
                  {projectItem.name}
                  <a href={projectItem.link} target="_blank" rel="noreferrer" className="ml-2 text-primary">
                    [링크]
                  </a>
                </>
              }
              onChange={v => onChange(Number(v))}
            />
          </li>
        ))}
      </>
    )}
  </ul>
);
