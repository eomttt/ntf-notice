import { ProjectItem } from 'api/ProjectApi';
import { CheckBox } from 'components/CheckBox';
import { useCallback } from 'react';

interface ProjectListProps {
  className?: string;
  isLoading?: boolean;
  isSelected: boolean;
  projectItems: ProjectItem[];
  onChange: (item: ProjectItem) => void;
}

export const ProjectList = ({ className, isLoading = false, isSelected, projectItems, onChange }: ProjectListProps) => {
  const handleChange = useCallback(
    (id: string) => {
      const find = projectItems.find(it => it.id === Number(id));
      if (find) {
        onChange(find);
      }
    },
    [onChange, projectItems],
  );

  return (
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
                    {projectItem.title}
                    <a href={projectItem.discordLink} target="_blank" rel="noreferrer" className="ml-2 text-primary">
                      [링크]
                    </a>
                  </>
                }
                onChange={handleChange}
              />
            </li>
          ))}
        </>
      )}
    </ul>
  );
};
