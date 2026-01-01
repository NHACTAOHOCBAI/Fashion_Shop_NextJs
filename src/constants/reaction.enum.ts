export enum ReactionType {
  LIKE = 'LIKE',
  LOVE = 'LOVE',
  HAHA = 'HAHA',
  WOW = 'WOW',
  SAD = 'SAD',
  ANGRY = 'ANGRY',
}

// Export as type for use in interfaces
export type ReactionTypeValue = ReactionType;

export const REACTION_ICONS: Record<ReactionType, string> = {
  [ReactionType.LIKE]: '👍',
  [ReactionType.LOVE]: '❤️',
  [ReactionType.HAHA]: '😂',
  [ReactionType.WOW]: '😮',
  [ReactionType.SAD]: '😢',
  [ReactionType.ANGRY]: '😠',
};

export const REACTION_COLORS: Record<ReactionType, string> = {
  [ReactionType.LIKE]: 'text-blue-500',
  [ReactionType.LOVE]: 'text-red-500',
  [ReactionType.HAHA]: 'text-yellow-500',
  [ReactionType.WOW]: 'text-purple-500',
  [ReactionType.SAD]: 'text-blue-400',
  [ReactionType.ANGRY]: 'text-orange-500',
};

export const REACTION_LABELS: Record<ReactionType, string> = {
  [ReactionType.LIKE]: 'Like',
  [ReactionType.LOVE]: 'Love',
  [ReactionType.HAHA]: 'Haha',
  [ReactionType.WOW]: 'Wow',
  [ReactionType.SAD]: 'Sad',
  [ReactionType.ANGRY]: 'Angry',
};
