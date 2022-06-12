import { cloneDeep } from 'lodash';
import {
  CSSProperties,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

type ColumnsCount = 1 | 2 | 3 | 4 | 5;
interface MasonryProps {
  contents: any[];
  columnsCount: ColumnsCount;
  render(state?: any): React.ReactElement;
  isContentLoading: boolean;
  setIsContentLoading: Dispatch<SetStateAction<boolean>>;
  isRendering: boolean;
  setIsRendering: Dispatch<SetStateAction<boolean>>;
  containerColsGap?: number;
  columnRowsGap?: number;
}
/**
 * Masonry UI 를 위해 필요한 props 들
 * @param contents Masonry UI 로 정렬할 컴포넌트를 렌더링할 데이터 / type: any[]
 * @param columnsCount 정렬할 열의 개수 / min: 1, max: 5
 * @param render Masonry UI 로 정렬할 컴포넌트를 렌더링
 * @param isContentLoading render props 에 들어온 컴포넌트 1개가 완전히 로드되었는지 여부 / type: boolean (default: false)
 * @param setIsContentLoading isContentLoading 값을 set 하는 함수. 내부 컴포넌트 하나가 로드되었을 때 false 로 바꾸기 위함
 * @param isRendering 컨텐츠가 현재 렌더링 중인지 여부. true 일 때 Masonry UI 가 화면에 그려짐 / type: boolean (default: true)
 * @param setIsRendering isRendering 값을 set 하는 함수. contents 가 모두 그려졌을 때 isRendering 을 false 로 바꿈
 * @param containerColsGap 세로열 간의 간격 / type: number (optional)
 * @param columnRowsGap 한 열 안의 컴포넌트 간 간격 / type: number (optional)
 */
const Masonry: FC<MasonryProps> = ({
  contents,
  columnsCount,
  render,
  isContentLoading,
  setIsContentLoading,
  isRendering,
  setIsRendering,
  containerColsGap,
  columnRowsGap,
}) => {
  const [contentIndex, setContentIndex] = useState(0);
  const [contentsDivided, setContentsDivided] = useState<any[][]>([
    [],
    [],
    [],
    [],
    [],
  ]);
  const [shortestColumnIndex, setShortestColumnIndex] = useState(0);

  const columnRefs = useRef<HTMLDivElement[]>([]);
  const columns = new Array(columnsCount).fill(0);

  useEffect(() => {
    setContentsDivided([[], [], [], [], []]);
    setContentIndex(0);
    setShortestColumnIndex(0);
  }, [columnsCount]);

  useEffect(() => {
    if (contents[contentIndex] && isRendering) {
      const deepCopied = cloneDeep(contentsDivided);
      deepCopied[shortestColumnIndex].push(contents[contentIndex]);
      setIsContentLoading(true);
      setContentsDivided(deepCopied);
    }
  }, [contents, contentIndex]);

  useEffect(() => {
    if (!contentsDivided[0][0]) return;
    if (isContentLoading) return;
    const maxIndex = columnsCount - 1;
    const colCurrents = columnRefs.current.filter((col, i) => i <= maxIndex);
    const columnHeights = colCurrents.map((col) => col.clientHeight);
    const findedIndex = colCurrents.findIndex((col) => {
      return col.clientHeight === Math.min(...columnHeights);
    });
    setShortestColumnIndex(findedIndex);
    if (contentsDivided[0][0]) {
      setContentIndex((prev) => prev + 1);
    }
  }, [contentsDivided, isContentLoading]);

  useEffect(() => {
    if (contents.length === 0) return;
    if (contents.length === contentIndex) setIsRendering(false);
  }, [contentIndex, contents]);

  return (
    <div style={masonContainerStyle(columnsCount, containerColsGap)}>
      {columns.map((col, i) => (
        <div key={i}>
          <div
            ref={(el: HTMLDivElement) => (columnRefs.current[i] = el)}
            style={columnStyle(columnRowsGap)}
          >
            {contentsDivided[i].map((content) => render(content))}
          </div>
        </div>
      ))}
    </div>
  );
};

const masonContainerStyle: (
  colCount?: number,
  colsGap?: number,
) => CSSProperties = (colCount = 2, colsGap = 10) => ({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
  gap: `${colsGap}px`,
});

const columnStyle: (rowsGap?: number) => CSSProperties = (rowsGap = 10) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: `${rowsGap}px`,
});

export default Masonry;
