
function PhotoPicker({ onChange }) {


  const component = <input type="file" hidden id="photo-picker" onChange={(e) => { onChange(e) }} />;

  return component
}

export default PhotoPicker;