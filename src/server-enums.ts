export enum SocketEnums {
    ClientRegister, AdminHide, AdminShow, AdminShowCiv, AdminHideCiv,
    AdminShowAll, AdminHideAll, AdminShowTech, AdminHideTech,
    AdminShowBlacksmith, AdminHideBlacksmith, AdminShowUniversity, AdminHideUniversity,
    AdminShowMonastary, AdminHideMonastary, AdminShowDock, AdminHideDock, AdminShowBracket, AdminHideBracket,
    AdminShowMaps, AdminHideMaps, AdminShowPlayerPicks, AdminHidePlayerPicks, OverlayPlayerInfo, PING
}

export enum OverlayEnums {
    All = 'all', Tech = 'tech', Blacksmith = 'blacksmith', University = 'university',
    Monastary = 'monastary', Dock = 'dock', Sound = 'sound', Barracks = 'barracks',
    'Archery-Range' = 'archery-range', Stable = 'stable', 'Siege-Workshop' = 'siege-workshop'
}

export enum MapEnums {
    Played, Current, Banned, Open
}