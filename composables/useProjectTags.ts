/**
 * Hiérarchie des technologies : une techno implique celles sur lesquelles elle
 * repose. Filtrer sur « Node.js » doit donc remonter un projet tagué NestJS,
 * et filtrer sur « PHP » un projet tagué Symfony.
 *
 * On ne déclare ici que des implications techniquement certaines, pour ne pas
 * attribuer au projet une techno qui n'y a pas été utilisée.
 */
export const TAGS_IMPLIQUES: Record<string, string[]> = {
  NestJS: ['Node.js'],
  Nuxt: ['Vue.js', 'Node.js'],
  Symfony: ['PHP'],
  Django: ['Python'],
  Kubernetes: ['DevOps']
}

/** Tags déclarés d'un projet, enrichis des tags qu'ils impliquent. */
export function tagsEtendus (tags?: string[]): string[] {
  const sortie = [...(tags ?? [])]
  for (const tag of tags ?? []) {
    for (const implique of TAGS_IMPLIQUES[tag] ?? []) {
      if (!sortie.includes(implique)) sortie.push(implique)
    }
  }
  return sortie
}
