import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export const CustomCaretExtension = Extension.create({
  name: 'customCaret',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('customCaret'),
        props: {
          decorations(state) {
            if (isMobile() || !state.selection.empty) {
              return null
            }

            const caretPos = state.selection.anchor
            const decoration = Decoration.widget(caretPos, () => {
              const caret = document.createElement('span')
              caret.className = 'custom-caret'
              return caret
            })

            return DecorationSet.create(state.doc, [decoration])
          },

          handleDOMEvents: {
            mousedown: (view, _event) => {
              setTimeout(() => {
                if (!view.hasFocus()) {
                  view.focus()
                }
              }, 0)
              return false
            },
            
            touchstart: (view, _event) => {
              setTimeout(() => {
                if (!view.hasFocus()) {
                  view.focus()
                }
              }, 0)
              return false
            },
          },
        },
      }),
    ]
  },
})