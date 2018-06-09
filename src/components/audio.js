export default ({url}) => (
  <audio controls autoPlay>
    <source src={url} type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>
);
