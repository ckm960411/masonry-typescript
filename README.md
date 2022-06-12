# Masonry UI

### 🛠 Masonry UI 란?

Masonry 란 '조적조'란 뜻으로, 대표적으로 핀터레스트 UI 를 생각하면 이해하기 쉽다.<br />
열(column)은 등분되어 있지만, 요소의 크기마다 다른 세로길이로 행이 제각각인 UI 다.<br />
이번에 이런 Masonry UI 를 다른 라이브러리를 쓰지 않고 타입스크립트로 구현해봤다.<br />

### 필요한 패키지
- CRA: CRA typesript 템플릿으로 구성했다. 이 컴포넌트는 기본적으로 리액트 기반이다.
- lodash, @types/lodash: 깊은 복사를 위해서 lodash 의 cloneDeep 메서드를 사용했다.

### 필수 props

- `contents` : Masonry UI 로 정렬할 컴포넌트를 렌더링할 데이터 / type: any[]
- `columnsCount` : 정렬할 열의 개수 / min: 1, max: 5
- `render` : Masonry UI 로 정렬할 컴포넌트를 렌더링
- `isContentLoading` : render props 에 들어온 컴포넌트 1개가 완전히 로드되었는지 여부 / type: boolean (default: false)
- `setIsContentLoading` : isContentLoading 값을 set 하는 함수. 내부 컴포넌트 하나가 로드되었을 때 false 로 바꾸기 위함
- `isRendering` : 컨텐츠가 현재 렌더링 중인지 여부. true 일 때 Masonry UI 가 화면에 그려짐 / type: boolean (default: true)
- `setIsRendering` : isRendering 값을 set 하는 함수. contents 가 모두 그려졌을 때 isRendering 을 false 로 바꿈

### 그외 props

- `containerColsGap` : 세로열 간의 간격 / type: number (optional)
- `columnRowsGap` : 한 열 안의 컴포넌트 간 간격 / type: number (optional)

### 사용 예시

```tsx
const [cards, setCards] = useState<any[]>([])
const [imagesLoading, setImagesLoading] = useState(false)
const [isRendering, setIsRendering] = useState(true)

<Masonry
  contents={cards}
  columnsCount={columnCount}
  isContentLoading={isImagesLoading}
  setIsContentLoading={setIsImagesLoading}
  isRendering={isRendering}
  setIsRendering={setIsRendering}
  render={(content) => (
    <Card
      data={content}
      setIsImagesLoading={setIsImagesLoading}
    />
  )}
/>
```
