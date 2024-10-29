import { FC } from "react";

interface HeaderProps {
	name: string;
}

const Header: FC<HeaderProps> = ({ name }) => {
	return <h1>{name}</h1>;
};

export default Header;
