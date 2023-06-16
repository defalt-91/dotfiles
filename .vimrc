syntax on

" Encoding"
set encoding=utf-8
set number
set noerrorbells
set tabstop=4 softtabstop=4
set shiftwidth=4
set expandtab
set smartindent
set nu
set nowrap
set smartcase
set noswapfile
set nobackup
set undodir=~/.vim/undodir
set undofile
set incsearch
set switchbuf=usetab
set colorcolumn=80
set mouse=a
" Set compatibility to vim only
"set nocompatible
filetype plugin indent on
syntax on
" Automatically wrap text that extends beyond screen length
"set wrap

" Start NERDTree when Vim starts with a directory argument.
autocmd StdinReadPre * let s:std_in=1
autocmd VimEnter * if argc() == 1 && isdirectory(argv()[0]) && !exists('s:std_in') |
    \ execute 'NERDTree' argv()[0] | execute 'cd '.argv()[0] | endif

" Exit Vim if NERDTree is the only window remaining in the only tab.
autocmd BufEnter * if tabpagenr('$') == 1 && winnr('$') == 1 && exists('b:NERDTree') && b:NERDTree.isTabTree() | quit | endif

nnoremap <leader>n :NERDTreeFocus<CR>
nnoremap <C-n> :NERDTree<CR>
nnoremap <C-t> :NERDTreeToggle<CR>
nnoremap <C-f> :NERDTreeFind<CR>

"Status bar
set laststatus=2
highlight ColorColumn ctermbg=0guibg=lightgrey

"let g:loaded_netrw       = 1
"let g:loaded_netrwPlugin = 1

""let g:floaterm_keymap_new    = '<F7>'
"let g:floaterm_keymap_prev   = '<F8>'
"let g:floaterm_keymap_next   = '<F9>'
"let g:floaterm_keymap_toggle = '<F12>'
" Set floaterm window's background to black
"hi Floaterm guibg=black
" Set floating window border line color to cyan, and background to orange
hi FloatermBorder guibg=orange guifg=cyan
"let g:floaterm_width = 0.9
"let g:floaterm_height = 0.9

"vim airline (status bar)
"let g:airline#extensions#tabline#enabled = 1
"let g:airline_powerline_fonts=1
"let g:airline#extensions#tabline#left_sep = ' '
"let g:airline#extensions#tabline#left_alt_sep = '|'
"let g:airline#extensions#tabline#formatter = 'unique_tail_improved'
"let g:airline_statusline_ontop=1



"colorscheme obsidian"

"Call the .vimrc.plug file"
if filereadable(expand("~/.vimrc.plug"))
	source ~/.vimrc.plug
endif

"let g:rainbow_active = 1"
"inoremap <silent><expr> <TAB>
      \ coc#pum#visible() ? coc#pum#next(1) :
      \ CheckBackspace() ? "\<Tab>" :
      \ coc#refresh()"
"inoremap <expr><S-TAB> coc#pum#visible() ? coc#pum#prev(1) : "\<C-h>""

                              
"inoremap <silent><expr> <c-space> coc#refresh()"

inoremap <silent><expr> <TAB> coc#pum#visible() ? coc#pum#confirm()
                              \: "\<C-g>u\<CR>\<c-r>=coc#on_enter()\<CR>"
                              
"inoremap <silent><expr> <TAB>
      \ coc#pum#visible() ? coc#pum#next(1) :
      \ CheckBackspace() ? "\<Tab>" :
      \ coc#refresh()"

"GoTo code navigation"
nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gr <Plug>(coc-references)
nnoremap <silent> K :call ShowDocumentation()<CR>
function! ShowDocumentation()
  if CocAction('hasProvider', 'hover')
    call CocActionAsync('doHover')
  else
    call feedkeys('K', 'in')
  endif
endfunction
autocmd CursorHold * silent call CocActionAsync('highlight')
nmap <leader>cl  <Plug>(coc-codelens-action)

" Add `:Format` command to format current buffer"
command! -nargs=0 Format :call CocActionAsync('format')

" Add `:Fold` command to fold current buffer"
command! -nargs=? Fold :call     CocAction('fold', <f-args>)

" Add `:OR` command for organize imports of the current buffer"
command! -nargs=0 OR   :call     CocActionAsync('runCommand', 'editor.action.organizeImport')


"-- Use <c-j> to trigger snippets"

"keyset("i", "<c-j>", "<Plug>(coc-snippets-expand-jump)")"
