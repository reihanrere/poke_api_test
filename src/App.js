import React, { useCallback, useEffect, useState } from "react";
import { apiGetPokemonDetail, apiGetPokemonList } from "./api/pokemonList.api";
import ResponsiveAppBar from "./components/AppBar";
import { Button, Container, TextField } from "@mui/material";
import CustomModal from "./components/Modal";

function App() {
  const [list, setList] = useState([]);
  const [listDetail, setListDetail] = useState({});
  const [searchText, setSearchText] = useState("");
  const [limit, setLimit] = useState(12);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const getPokemonList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiGetPokemonList({ limit });
      setList(res?.response?.results);
    } catch (error) {
      console.log(error);
    }
  }, [limit]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 12);
  };

  const filteredList = list.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleShowDetail = useCallback(async (i) => {
    try {
      const res = await apiGetPokemonDetail({ params: i });
      setListDetail(res.response);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    setListDetail({});
  };

  useEffect(() => {
    getPokemonList();

    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(loadingTimer);
    };
  }, [getPokemonList]);

  return (
    <>
      <ResponsiveAppBar />
      <Container>
        <div className="wrapper">
          <div className="card">
            <div className="card-header">
              <TextField
                label="Search Pokemon"
                variant="outlined"
                value={searchText}
                onChange={handleSearch}
                size="small"
                sx={{ width: "100%", maxWidth: "300px" }} // Atur lebar TextField sesuai kebutuhan
              />
            </div>
            <div className="card-body">
              {filteredList.map((d, i) => {
                return (
                  <div
                    className={`card-item ${loading ? "loading" : ""}`}
                    key={i}
                    onClick={() => handleShowDetail(i + 1)}
                  >
                    <div className="title">
                      <span className="number">{`#${i + 1}`}</span>
                      <span className="text">{d.name.toUpperCase()}</span>
                    </div>
                    <div className="image">
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                          i + 1
                        }.png`}
                        width={130}
                        alt={`pokemon-${i}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="card-footer">
              <Button
                variant="contained"
                color="primary"
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? "Loading..." : "Load More"}
              </Button>
            </div>
          </div>
        </div>
      </Container>
      <CustomModal open={open} data={listDetail} handleClose={handleClose} />
    </>
  );
}

export default App;
