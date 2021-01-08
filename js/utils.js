/**
 * @example ToFalse(data)
 * @description 通过state来选择显示哪个流程 主题，布置，流程
 * @param { number } state
 * @return { void }
 */
export function ToHidden(state) {
    const showFlow = ['.main-form', '.state', '.process']
    document.querySelector(showFlow.splice(state, 1)).style.display = ''
    showFlow.forEach(item => document.querySelector(item).style.display = 'none')
}