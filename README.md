# neo-design-patterns-hw-09

1. Патерн Шаблонний метод

Базовий клас `DataExporter` визначає фіксований алгоритм експорту у методі `export()`:

- `load()` — завантаження даних з API
- `transform()` — фільтрація полів, сортування за іменем
- `beforeRender()` — hook (порожній за замовчуванням)
- `render()` — абстрактний, форматування у цільовий формат
- `afterRender()` — hook (порожній за замовчуванням)
- `save()` — абстрактний, збереження файлу

Підкласи `CsvExporter`, `JsonExporter`, `XmlExporter` реалізують лише `render()` і `save()`. `XmlExporter` також перевизначає `afterRender()`, додаючи коментар з часом генерації.

2. Додавання нового формату

- Створіть файл `src/exporters/YourExporter.ts`.
- Успадкуйте від `DataExporter`.
- Реалізуйте `render()` та `save()`.
- За потреби перевизначте `beforeRender()` або `afterRender()`.

3. Ітератори

Кожен ітератор (`CsvIterator`, `JsonIterator`, `XmlIterator`) читає готовий файл, парсить його та реалізує `[Symbol.iterator]()`, що дозволяє використовувати `for...of`.

4. Запуск
   npm install
   npx ts-node ./src/main.ts
   npx ts-node ./src/main-iterate.ts
