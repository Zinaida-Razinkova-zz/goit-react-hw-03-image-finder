import React, { Component } from "react";
import { imagesApi } from "./services/img-api";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal/Modal";
import styles from "./App.module.css";

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: "",
    isLoading: false,
    error: null,
    showModal: false,
    imageModal: "",
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }
  onChangeQuery = (query) => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
    });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const option = {
      searchQuery,
      currentPage,
    };
    this.setState({ isLoading: true });
    imagesApi(option)
      .then((hits) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...hits],
          currentPage: prevState.currentPage + 1,
        }));
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };
  openModal = (event) => {
    if (event.target.nodeName === "IMG") {
      console.log(event.target.dataset.url);
      this.setState({
        imageModal: event.target.dataset.url,
        showModal: true,
      });
    }
  };

  closeModal = (event) => {
    this.setState({
      imageModal: "",
      showModal: false,
    });
  };

  render() {
    const { images, isLoading, error, imageModal, showModal } = this.state;
    const showLoadMoreBtn = images.length > 0 && !isLoading;

    return (
      <div className={styles.App}>
        <SearchBar onSubmit={this.onChangeQuery} />
        {error && <h2>Ошибка!</h2>}

        <ImageGallery list={images} onClick={this.openModal} />
        {showModal && (
          <Modal onClose={this.closeModal}>
            <img src={imageModal} alt="" />
          </Modal>
        )}
        {isLoading && <h1>Загружаем...</h1>}
        {showLoadMoreBtn && (
          <button
            className={styles.Button}
            type="button"
            onClick={this.fetchImages}
          >
            Загрузить ещё
          </button>
        )}
      </div>
    );
  }
}
export default App;
