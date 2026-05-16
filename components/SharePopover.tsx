"use client";
export function SharePopover() { return <div className="absolute right-0 top-11 w-80 rounded-xl border bg-white p-4 shadow-soft z-40">
  <h4 className="mb-3 font-medium">Share</h4>
  <label className="text-xs">Workspace access</label><select className="mb-3 mt-1 w-full rounded border p-2"><option>Private</option><option>Anyone with link</option></select>
  <input className="mb-3 w-full rounded border p-2" placeholder="Invite by email" />
  <select className="mb-3 w-full rounded border p-2"><option>View</option><option>Comment</option><option>Edit</option></select>
  <button className="w-full rounded bg-accent px-3 py-2 text-white">Copy link</button>
</div>;}
