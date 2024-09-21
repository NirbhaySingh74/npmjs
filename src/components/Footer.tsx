const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 text-center">
      <p>&copy; {new Date().getFullYear()} npm, Inc. | Terms | Privacy</p>
    </footer>
  );
};

export default Footer;
