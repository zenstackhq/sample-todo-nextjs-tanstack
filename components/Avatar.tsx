import { User } from "next-auth";
import { Avatar, AvatarImage } from "./ui/avatar";

type Props = {
	user: User;
	size?: number;
};

export default function UserAvatar({ user, size }: Props) {
	if (!user) {
		return <></>;
	}
	return (
		<Avatar className="h-8 w-8">
			<AvatarImage
				src={user.image || "/avatar.jpg"}
				alt={user.name || user.email || ""}
				width={size || 32}
				height={size || 32}
			/>
		</Avatar>
	);
}
