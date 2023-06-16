--[[ keys.lua ]]
local map = vim.api.nvim_set_keymap

-- remap the key used to leave insert mode
map('i', 'jk', '', {})
map('i','tab','',{})
map('i','<c-j>','<Plug>(coc-snippets-expand-jump)',{})

