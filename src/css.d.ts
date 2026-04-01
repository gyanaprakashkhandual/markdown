/* Tells TypeScript to treat any .css import as a valid side-effect module.
   Without this, TS throws TS2882 on bare CSS imports like:
   import '../styles/Block.style.css'                                        */
declare module "*.css";