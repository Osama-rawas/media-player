export default function InputFile({ title, choose, accept, multiple, icon }) {
  return (
    <div className="inputFile">
      <input
        type="file"
        accept={accept}
        id="file"
        onChange={choose}
        multiple={multiple}
      />
      <label for="file">
        <div>{icon}</div>
        <div>
          Choose
          {title}
        </div>
      </label>
    </div>
  );
}
