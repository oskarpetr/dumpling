// get avatar with user id
export function getAvatar(id: string) {
  return `https://firebasestorage.googleapis.com/v0/b/dumpling-oskarpetr.appspot.com/o/avatars%2F${id}?alt=media`;
}
