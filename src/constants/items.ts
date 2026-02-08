/**
 * Character and accessory definitions using public image assets.
 * Accessory images are designed to overlay the character at the same pixel size.
 */

export const CHARACTERS = [
  { id: 'default', name: 'Default', cost: 0, image: '/basicperson.png' },
  { id: 'poorcheapboy', name: 'Scholar', cost: 80, image: '/poorcheapboy.png' },
  { id: 'poorcheapgirl', name: 'Scholar', cost: 80, image: '/poorcheapgirl.png' },
  { id: 'expensiveboy', name: 'Pro', cost: 200, image: '/expensiveboy.png' },
  { id: 'expensivegirl', name: 'Pro', cost: 200, image: '/expensivegirl.png' },
] as const

export const ACCESSORIES = [
  { id: 'heart', name: 'Heart', cost: 30, image: '/accessory_heart.png' },
  { id: 'hearts', name: 'Hearts', cost: 50, image: '/accessory_hearts.png' },
  { id: 'star', name: 'Star', cost: 40, image: '/accessory_star.png' },
  { id: 'flower', name: 'Flower', cost: 35, image: '/accessory_flower.png' },
  { id: 'leaf', name: 'Leaf', cost: 25, image: '/accessory_leaf.png' },
  { id: 'bow', name: 'Bow', cost: 60, image: '/accessory_bow.png' },
  { id: 'coin', name: 'Coin', cost: 45, image: '/accessory_coin.png' },
  { id: 'chicken', name: 'Chicken', cost: 55, image: '/accessory_chicken.png' },
  { id: 'bonsai', name: 'Bonsai', cost: 70, image: '/accessory_bonsai.png' },
] as const

export const NAMETAGS = [
  { id: 'default', name: 'Default', cost: 0, style: 'default' as const },
  { id: 'gold', name: 'Gold nameplate', cost: 200, style: 'gold' as const },
  { id: 'crown', name: 'Crown nameplate', cost: 500, style: 'crown' as const },
] as const

export type CharacterId = (typeof CHARACTERS)[number]['id']
export type AccessoryId = (typeof ACCESSORIES)[number]['id']
