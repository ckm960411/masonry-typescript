# Masonry UI

### ๐  Masonry UI ๋?

Masonry ๋ '์กฐ์ ์กฐ'๋ ๋ป์ผ๋ก, ๋ํ์ ์ผ๋ก ํํฐ๋ ์คํธ UI ๋ฅผ ์๊ฐํ๋ฉด ์ดํดํ๊ธฐ ์ฝ๋ค.<br />
์ด(column)์ ๋ฑ๋ถ๋์ด ์์ง๋ง, ์์์ ํฌ๊ธฐ๋ง๋ค ๋ค๋ฅธ ์ธ๋ก๊ธธ์ด๋ก ํ์ด ์ ๊ฐ๊ฐ์ธ UI ๋ค.<br />
์ด๋ฒ์ ์ด๋ฐ Masonry UI ๋ฅผ ๋ค๋ฅธ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ ์ฐ์ง ์๊ณ  ํ์์คํฌ๋ฆฝํธ๋ก ๊ตฌํํด๋ดค๋ค.<br />

### ํ์ํ ํจํค์ง
- CRA: CRA typesript ํํ๋ฆฟ์ผ๋ก ๊ตฌ์ฑํ๋ค. ์ด ์ปดํฌ๋ํธ๋ ๊ธฐ๋ณธ์ ์ผ๋ก ๋ฆฌ์กํธ ๊ธฐ๋ฐ์ด๋ค.
- lodash, @types/lodash: ๊น์ ๋ณต์ฌ๋ฅผ ์ํด์ lodash ์ cloneDeep ๋ฉ์๋๋ฅผ ์ฌ์ฉํ๋ค.

### ํ์ props

- `contents` : Masonry UI ๋ก ์ ๋ ฌํ  ์ปดํฌ๋ํธ๋ฅผ ๋ ๋๋งํ  ๋ฐ์ดํฐ / type: any[]
- `columnsCount` : ์ ๋ ฌํ  ์ด์ ๊ฐ์ / min: 1, max: 5
- `render` : Masonry UI ๋ก ์ ๋ ฌํ  ์ปดํฌ๋ํธ๋ฅผ ๋ ๋๋ง
- `isContentLoading` : render props ์ ๋ค์ด์จ ์ปดํฌ๋ํธ 1๊ฐ๊ฐ ์์ ํ ๋ก๋๋์๋์ง ์ฌ๋ถ / type: boolean (default: false)
- `setIsContentLoading` : isContentLoading ๊ฐ์ set ํ๋ ํจ์. ๋ด๋ถ ์ปดํฌ๋ํธ ํ๋๊ฐ ๋ก๋๋์์ ๋ false ๋ก ๋ฐ๊พธ๊ธฐ ์ํจ
- `isRendering` : ์ปจํ์ธ ๊ฐ ํ์ฌ ๋ ๋๋ง ์ค์ธ์ง ์ฌ๋ถ. true ์ผ ๋ Masonry UI ๊ฐ ํ๋ฉด์ ๊ทธ๋ ค์ง / type: boolean (default: true)
- `setIsRendering` : isRendering ๊ฐ์ set ํ๋ ํจ์. contents ๊ฐ ๋ชจ๋ ๊ทธ๋ ค์ก์ ๋ isRendering ์ false ๋ก ๋ฐ๊ฟ

### ๊ทธ์ธ props

- `containerColsGap` : ์ธ๋ก์ด ๊ฐ์ ๊ฐ๊ฒฉ / type: number (optional)
- `columnRowsGap` : ํ ์ด ์์ ์ปดํฌ๋ํธ ๊ฐ ๊ฐ๊ฒฉ / type: number (optional)

### ์ฌ์ฉ ์์

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
