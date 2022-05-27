import { ProjectList } from 'components/ProjectList';
import { useGetProjectItems } from 'hooks/useGetProjectItems';
import { useEffect, useMemo } from 'react';

interface SelectProjectsProps {
  className?: string;
  onChange: (itemIds: number[]) => void;
}

export const SelectProjects = ({ className, onChange }: SelectProjectsProps) => {
  const { isLoading, projectItems, selectedProjectMap, addSelected, removeSelected } = useGetProjectItems();

  const unSelectedProjectItems = useMemo(
    () => projectItems.filter(({ id }) => !selectedProjectMap[id]),
    [projectItems, selectedProjectMap],
  );

  const selectedProjectItems = useMemo(
    () => projectItems.filter(({ id }) => selectedProjectMap[id]),
    [projectItems, selectedProjectMap],
  );

  useEffect(() => {
    onChange(Object.keys(selectedProjectMap).map(Number));
  }, [onChange, selectedProjectMap]);

  return (
    <section className={`w-full ${className}`}>
      <p className="mt-5 mb-2 text-s">프로젝트 목록</p>
      <ProjectList
        isSelected={false}
        isLoading={isLoading}
        projectItems={unSelectedProjectItems}
        onChange={addSelected}
      />
      <p className="mt-5 mb-2 text-s">구독 목록</p>
      <ProjectList isSelected projectItems={selectedProjectItems} onChange={removeSelected} />
    </section>
  );
};
