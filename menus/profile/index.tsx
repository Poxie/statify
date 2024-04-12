import Menu, { MenuGroup } from "../Menu";

export default function ProfileMenu() {
    const signOut = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    const groups: MenuGroup[] = [[
        { text: 'Profile', href: '/profile' },
        { text: 'Sign out', onClick: signOut, type: 'danger' },
    ]]

    return(
        <Menu 
            groups={groups}
        />
    )
}