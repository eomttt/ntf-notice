import { ProjectApi, SelectedProjectItemMap } from 'api/ProjectApi';
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
  const { mutate } = useSWRConfig();

  const { data: projectData, error } = useSWR('/projects', () => ProjectApi.getProjects(searchText));
  const { data: selectedProjectData } = useSWR('/projects/selected', () => ProjectApi.getUserSelectedProjects(), {
    revalidateOnFocus: false,
  });

  const [selectedProjectMap, setSelectedProjectMap] = useState<SelectedProjectItemMap>({});

  const unSelectedProjectItems = useMemo(
    () => projectData?.data.projectItems.filter(({ id }) => !selectedProjectMap[id]) || [],
    [projectData?.data.projectItems, selectedProjectMap],
  );

  const selectedProjectItems = useMemo(
    () => projectData?.data.projectItems.filter(({ id }) => selectedProjectMap[id]) || [],
    [projectData?.data.projectItems, selectedProjectMap],
  );

  const addSelected = useCallback((id: number) => {
    setSelectedProjectMap(prev => ({ ...prev, [id]: true }));
  }, []);

  const removeSelected = useCallback((id: number) => {
    setSelectedProjectMap(prev => ({ ...prev, [id]: false }));
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
    onChange(
      Object.keys(selectedProjectMap).reduce<number[]>((acc, cur) => {
        if (selectedProjectMap[Number(cur)]) {
          acc.push(Number(cur));
        }
        return acc;
      }, []),
    );
  }, [selectedProjectMap, onChange, selectedProjectItems]);

  useEffect(() => {
    setSelectedProjectMap(selectedProjectData?.data?.selectedProjectMap || {});
  }, [selectedProjectData?.data?.selectedProjectMap]);

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
      <ProjectList isSelected projectItems={selectedProjectItems} onChange={removeSelected} />
      <p className="mt-5 mb-2 text-s">추가 제안하고 싶은 프로젝트를 입력해주세요.</p>
      <Input placeholder="프로젝트1, 프로젝트2, 프로젝트3" onChange={handleChangeOptions} />
    </section>
  );
};
