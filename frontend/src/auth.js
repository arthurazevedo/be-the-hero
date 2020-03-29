export default function isAuthenticated() {
  const ongId = localStorage.getItem('ongId');

  return !!(ongId);
}
