import "./ContainerList.css";

const imageUrlList = [
  "https://raw.githubusercontent.com/Jhongilp/logex-container-reader/main/container1.jpg",
  "https://raw.githubusercontent.com/Jhongilp/logex-container-reader/main/container2.jpg",
  "https://raw.githubusercontent.com/Jhongilp/logex-container-reader/main/container3.jpg",
  "https://raw.githubusercontent.com/Jhongilp/logex-container-reader/main/container4.jpg",
  "https://raw.githubusercontent.com/Jhongilp/logex-container-reader/main/container5.jpg",
  "https://raw.githubusercontent.com/Jhongilp/logex-container-reader/main/container6.jpg",
  "https://raw.githubusercontent.com/Jhongilp/logex-container-reader/main/container7.jpg",
  "https://raw.githubusercontent.com/Jhongilp/logex-container-reader/main/container8.jpg",
  "https://raw.githubusercontent.com/Jhongilp/logex-container-reader/main/container9.jpg",
  "https://raw.githubusercontent.com/Jhongilp/logex-container-reader/main/container10.jpg",
  "https://raw.githubusercontent.com/Jhongilp/logex-container-reader/main/container11.jpg",
  "https://raw.githubusercontent.com/Jhongilp/logex-container-reader/main/container12.jpg",
  "https://raw.githubusercontent.com/Jhongilp/logex-container-reader/main/container13.jpg",
  "https://raw.githubusercontent.com/Jhongilp/logex-container-reader/main/container14.jpg",
  "https://raw.githubusercontent.com/Jhongilp/logex-container-reader/main/container15.jpg",
  "https://raw.githubusercontent.com/Jhongilp/logex-container-reader/main/container16.jpg",
  "https://raw.githubusercontent.com/Jhongilp/logex-container-reader/main/container17.jpg",
  "https://raw.githubusercontent.com/Jhongilp/logex-container-reader/main/container18.jpg",
  "https://raw.githubusercontent.com/Jhongilp/logex-container-reader/main/container19.jpg",
];

export const ContainerList = ({ onSelect }) => {
  return (
    <ul className="container-list">
      {imageUrlList.map((url) => {
        return (
          <li
            key={url}
            className="container-list-item"
            onClick={() => onSelect(url)}
          >
            <div>
              <img src={url} alt="Cargo container"></img>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
