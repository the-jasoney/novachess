'use client';

import './component.css';

import { Sidebar } from 'flowbite-react';
import { FaChessBoard } from 'react-icons/fa';
import { TfiBlackboard } from 'react-icons/tfi';
import { MdLogin, MdSupervisorAccount } from 'react-icons/md';

export function Component() {
  return (
    <div id="sidebar">
      <Sidebar aria-label="Sidebar" className="h-screen">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="/play"
              icon={FaChessBoard}
            >
              <p>
                Play
              </p>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={TfiBlackboard}
            >
              <p>
                Learn
              </p>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="#"
              icon={MdLogin}
            >
              <p>
                Login
              </p>
            </Sidebar.Item>

            <Sidebar.Item
              href="#"
              icon={MdSupervisorAccount}
            >
              <p>
                Sign up
              </p>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  )
}

