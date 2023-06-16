# Setup fzf
# ---------
if [[ ! "$PATH" == */home/defalt91/.fzf/bin* ]]; then
  PATH="${PATH:+${PATH}:}/home/defalt91/.fzf/bin"
fi

# Auto-completion
# ---------------
[[ $- == *i* ]] && source "/home/defalt91/.fzf/shell/completion.bash" 2> /dev/null

# Key bindings
# ------------
source "/home/defalt91/.fzf/shell/key-bindings.bash"
