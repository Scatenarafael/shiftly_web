import {
  Binoculars,
  BookOpenText,
  Dam,
  Settings,
  SquareActivity,
} from 'lucide-react';
import { Link } from 'react-router';

import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Button } from './ui/button';
export function NavMenu() {
  const { showNavMenu, setShowNavMenu } = useContext(AuthContext);

  return (
    <div
      data-state-open={showNavMenu}
      onFocus={() => {
        setShowNavMenu(true);
      }}
      onMouseOver={() => {
        setShowNavMenu(true);
      }}
      onMouseLeave={() => {
        setShowNavMenu(false);
      }}
      className="flex min-h-full flex-1 max-w-12 data-[state-open=true]:max-w-48 flex-col bg-gradient-to-b from-foreground to-primary/70 dark:from-primary/70 transition-all ease-in-out duration-500"
    >
      {!showNavMenu && (
        <div className="flex absolute top-2 left-[-5px] bg-gradient-to-r from-foreground to-primary/90 dark:from-primary-foreground dark:to-primary p-3 justify-center items-center rounded-full">
          <Dam className="h-9 w-9 text-primary dark:text-foreground" />
        </div>
      )}

      {showNavMenu && (
        <Link to="/">
          <div className="flex h-20 items-center gap-2 px-4 text-accent">
            <Dam className="h-10 w-10 text-primary dark:text-foreground" />
            <p className="text-lg font-bold text-primary dark:text-foreground lg:text-lg">
              PhotonDam
            </p>
          </div>
        </Link>
      )}
      <div className="flex-1 space-y-10 bg-transparent px-2 py-10 text-white">
        {!showNavMenu ? (
          <Button variant="ghost" className="p-0 mt-20 w-6 h-6">
            <BookOpenText className="w-5 h-5" />
          </Button>
        ) : (
          <Link to="/reports?page=1">
            <div className="w-full hover:underline">Reports</div>
          </Link>
        )}

        <Accordion type="multiple">
          <div className="flex flex-col gap-10">
            {!showNavMenu ? (
              <Button variant="ghost" className="p-0 w-6 h-6">
                <Settings className="w-5 h-5" />
              </Button>
            ) : (
              <AccordionItem value="users" className="border-b-0">
                <AccordionTrigger>Setup</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4">
                  <Link to="/users?page=1">
                    <div className="pl-4 w-full hover:underline">Users</div>
                  </Link>
                  <Link to="/regions?page=1">
                    <div className="pl-4  w-full hover:underline">Regions</div>
                  </Link>
                  <Link to="/companies?page=1">
                    <div className="pl-4  w-full hover:underline">
                      Mining Companies
                    </div>
                  </Link>
                  <Link to="/sites?page=1">
                    <div className="pl-4  w-full hover:underline">Sites</div>
                  </Link>
                  <Accordion type="multiple">
                    <AccordionItem value="interrogators" className="border-b-0">
                      <AccordionTrigger className="p-0 text-start justify-start flex-row-reverse gap-[2px] [&>svg]:rotate-[-90deg] [&[data-state=open]>svg]:rotate-0">
                        <div className="w-full hover:underline">Structures</div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-5 pt-3 flex flex-col gap-2">
                        <Link to="/structure-types-and-ores?page=1">
                          <span className="w-full text-xs hover:underline">
                            Setup
                          </span>
                        </Link>
                        <Link to="/structures?page=1">
                          <span className="w-full text-xs hover:underline">
                            Registers and Equipments
                          </span>
                        </Link>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Accordion type="multiple">
                    <AccordionItem value="interrogators" className="border-b-0">
                      <AccordionTrigger className="p-0 text-start justify-start flex-row-reverse gap-[2px] [&>svg]:rotate-[-90deg] [&[data-state=open]>svg]:rotate-0">
                        <div className="w-full hover:underline">
                          Interrogators
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-5 pt-3 flex flex-col gap-2">
                        <Link to="/modules?page=1">
                          <span className="w-full text-xs hover:underline">
                            Modules
                          </span>
                        </Link>
                        <Link to="/interrogators?page=1">
                          <span className="w-full text-xs hover:underline">
                            Registers
                          </span>
                        </Link>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            )}
            {!showNavMenu ? (
              <Button variant="ghost" className="p-0 w-6 h-6">
                <SquareActivity className="w-5 h-5" />
              </Button>
            ) : (
              <AccordionItem value="actions" className="border-b-0">
                <AccordionTrigger>Actions</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 pl-4">
                  <Link to="/alarms?page=1">
                    <div className="w-full hover:underline">Alarms</div>
                  </Link>
                </AccordionContent>
              </AccordionItem>
            )}
            {!showNavMenu ? (
              <Button variant="ghost" className="p-0 w-6 h-6">
                <Binoculars className="w-5 h-5" />
              </Button>
            ) : (
              <AccordionItem value="monitoring" className="border-b-0">
                <AccordionTrigger>Monitoring</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 pl-4">
                  <Link to="/waterfall?page=1">
                    <div className="w-full hover:underline">Waterfall</div>
                  </Link>
                </AccordionContent>
              </AccordionItem>
            )}
          </div>
        </Accordion>
      </div>
    </div>
  );
}
