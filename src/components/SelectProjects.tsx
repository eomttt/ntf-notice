import { ProjectApi, ProjectItem } from 'api/ProjectApi';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { ProjectList } from 'components/ProjectList';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

interface SelectProjectsProps {
  className?: string;
  onChange: (itemIds: number[]) => void;
  onChangeProposeProjects: (proposeProjects: string) => void;
}

export const SelectProjects = ({ className, onChange, onChangeProposeProjects }: SelectProjectsProps) => {
  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = useState<ProjectItem[]>([]);
  const { mutate } = useSWRConfig();

  const { data: projectData, error } = useSWR('/projects', () => ProjectApi.getProjects(searchText));
  const { data: selectedProjectData } = useSWR('/projects/selected', () => ProjectApi.getUserSelectedProjects(), {
    revalidateOnFocus: false,
  });

  const unSelectedProjectItems = useMemo(() => {
    if (!projectData?.data.projectItems) {
      return [];
    }
    const selectedItemIds = selected.map(it => it.id);
    return projectData.data.projectItems.filter(it => !selectedItemIds.includes(it.id));
  }, [projectData?.data.projectItems, selected]);

  const addSelected = useCallback((item: ProjectItem) => {
    setSelected(prev => [...prev, item]);
  }, []);

  const removeSelected = useCallback((item: ProjectItem) => {
    setSelected(prev => [...prev].filter(it => it.id !== item.id));
  }, []);

  const handleClickSearch = useCallback(() => {
    mutate('/projects');
  }, [mutate]);

  const handleChangeOptions = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChangeProposeProjects(e.target.value);
    },
    [onChangeProposeProjects],
  );

  useEffect(() => {
    onChange(selected.map(it => it.id));
  }, [onChange, selected]);

  useEffect(() => {
    setSelected(selectedProjectData?.data?.projectItems || []);
  }, [selectedProjectData?.data?.projectItems]);

  return (
    <section className={`w-full ${className}`}>
      <div className="flex items-end justify-between">
        <Input
          placeholder="찾으시는 프로젝트를 검색해보세요."
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
        />
        <Button className="ml-5" type="button" label="검색" onClick={handleClickSearch} />
      </div>
      <p className="mt-5 mb-2 text-s">프로젝트 목록</p>
      <ProjectList
        isSelected={false}
        isLoading={!projectData && !error}
        projectItems={unSelectedProjectItems}
        onChange={addSelected}
      />
      <p className="mt-5 mb-2 text-s">구독 목록</p>
      <ProjectList isSelected projectItems={selected} onChange={removeSelected} />
      <p className="mt-5 mb-2 text-s">추가 제안하고 싶은 프로젝트를 입력해주세요.</p>
      <Input placeholder="프로젝트1, 프로젝트2, 프로젝트3" onChange={handleChangeOptions} />
    </section>
  );
};
