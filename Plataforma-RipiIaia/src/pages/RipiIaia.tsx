const getRipiIaiaUrl = () => {
  if (window.location.hostname === "localhost") {
    return "http://localhost:5173/Ripi-Iaia/";
  }
  if (window.location.hostname.includes("github.io")) {
    return "/Ong-Ripiiaia/Ripi-Iaia/";
  }
  // Produção: ajuste o domínio conforme o deploy final
  return "/Ripi-Iaia/";
};

const RipiIaia = () => (
  <div style={{ width: "100%", height: "90vh" }}>
    <iframe
      src={getRipiIaiaUrl()}
      title="Ripi-Iaia"
      width="100%"
      height="100%"
      style={{ border: "none" }}
      allow="clipboard-write; autoplay; encrypted-media"
    />
  </div>
);

export default RipiIaia;
